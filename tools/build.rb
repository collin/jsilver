require 'lib/jsilver'
require 'continuous_builder'
require 'ostruct'
require 'haml'
require 'stomp'

$morbid = Stomp::Client.new
$morbid.subscribe "CHANNEL_2"

module JSilver
  class Builder < ContinuousBuilder
    attr_accessor :script_items
    
    watches :javascripts,
      :wait_for_all_edits => true,
      :files  => JSilver.root/'{app}'/'**'/'*.js',
      :update => :bookmarklet
      
    watches :specs,
      :files  => JSilver.root/'specs'/'{models,views,controllers}'/'**'/'*.js',
      :update => :spec
    
    watches :screw_unit,
      :wait_for_all_edits => true,
      :files => JSilver.root/'vendor'/'screw-unit'/'lib'/'*',
      :update => :screw_unit_package
      
    watches :spec_runner,
      :files => JSilver.root/'specs'/'haml'/'runner.html.haml',
      :module => Haml
    
    def screw_unit_package path
      s = []
      lib = JSilver.root/'vendor'/'screw-unit'/'lib'
      s << lib/'jquery-1.2.6.js'
      s << lib/'jquery.fn.js'
      s << lib/'jquery.print.js'
      s << lib/'screw.builder.js'
      s << lib/'screw.matchers.js'
      s << lib/'screw.events.js'
      s << lib/'screw.behaviors.js'
      
      s.map!(&:read)
      
      css = (lib/'screw.css').read.escape_literals.flat
      
      s << "jQuery(function(_){_('head').append(\"<style>#{css}</style>\") });"
      
      script = ""
      
      s.each do |atom|
        script << atom
        script << "\n"
      end
      
#      File.open(JSilver.root/'specs'/'screw-unit.js', 'w+') do |f|
#        f.write script
#      end
    end
    
    def spec path
      short_path = path.to_s.gsub((JSilver.root/'specs').to_s, '')
      en = Haml::Engine.new((JSilver.root/'specs'/'template.html.haml').read)
      html = en.render OpenStruct.new(:scripts => [short_path]) do; end
      name = path.basename.to_s .gsub(".#{path.extname}", '')
      new_path = Pathname.new(path).dirname/"#{name}.html"
      File.open(new_path, 'w+') do |f|
        f.write(html)
      end
      
      $morbid.send 'CHANNEL_1', html
    end
    
    def bookmarklet path
      #spec_for(path)
      
      @script_items = []
      vendor
      preamble
      stylesheets
      markup
      postamble
      
      File.open(JSilver.root/'public'/'embedded.js', 'w+') do |f|
        script = ""
        
        
        script_items.each do |item|
          if item.is_a?(Pathname)
            script += item.read
          elsif item.is_a?(String)
            script += item
          end
          script += "\n"
        end
        
        f.write(script)
      end
    end
    
    def preamble
      @script_items.instance_eval do
        push "// THIS IS A GENERATED FILE FOR THE LOVE OF GOD DO NOT EDIT IT DIRECTLY"
        push "// Generated at: #{Time.new}"
        push ";(function(_){"
        push "_.jSilver = {};"
      end
    end
    
    def postamble
      @script_items << "})(jQuery);"
    end
    
    def stylesheets
      JSilver.glob do; self/'views'/'**'/'*.css' end.each do |markup|
        name = markup.basename.gsub(".#{markup.extname}", '')
        css = markup.read.escape_literals
       
        @script_items.instance_eval do
          self << "_.jSilver.#{name} = \"<style>#{css}</style>\";"
          self << "_(function() { _('head').append(_.jSilver.#{name});)});"
        end
      end
    end
    
    def markup
      JSilver.glob do; self/'views'/'**'/'*.html' end.each do |markup|
        name = markup.basename.gsub(".#{markup.extname}", '')
        html = markup.read.escape_literals
       
        @script_items << "_.jSilver.#{name} = \"#{html}\";"
      end
    end
    
    def vendor
      @script_items.instance_eval do
        push JSilver.root/'vendor'/'jquery-1.2.6.js'
        push JSilver.root/'vendor'/'keybinder'/'jquery.keybinder.js'
      end
    end
  end
end

b = JSilver::Builder.new
b.build_all
b.build_continuously
