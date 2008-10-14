require 'lib/jsilver'
require 'continuous_builder'

class IOStream
  def to_s
  
  end
end

module JSilver
  class Builder < ContinuousBuilder
    attr_accessor :script_items
    
    watches :javascripts,
      :wait_for_all_edits => true,
      :files  => JSilver.root/'**'/'*.js',
      :update => :bookmarklet

    
    def bookmarklet path
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
            puts item
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
#       push JSilver.root/'vendor'/'keybinder'/'jquery.keybinder.js'
      end
    end
  end
end

b = JSilver::Builder.new
b.build_all
b.build_continuously
