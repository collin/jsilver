require 'lib/jsilver'
require 'continuous_builder'

class String
  def escape_literals
    gsub /\"/ , "\\\""
  end
end

module JSilver
  class Builder < ContinuousBuilder
    attr_accessor :script_items
    
    watches :javascripts,
      :wait_for_all_edits => true,
      :files  => JSilver.root/'**'/'*.js',
      :update => :bookmarklet

    
    def bookmarklet
      vendor
      preamble
      stylesheets
      markup
      postamble
      
      File.open(JSilver.root/'public'/'embedded.js', 'w+') do |f|
        f.write(script_items.map(&:to_s).join('\n'))
      end
    end
    
    def preamble
      script_items.instance_eval do
        << "THIS IS A GENERATED FILE FOR THE LOVE OF GOD DO NOT EDIT IT DIRECTLY"
        << "Generated at: #{Time.new}"
        << ";(function(_){"
        << "_.jSilver = {};"
      end
    end
    
    def postamble
      script_items << "})(jQuery);"
    end
    
    def stylesheets
      JSilver.glob{/'views'/'**'/'*.css'}.each do |markup|
        name = markup.basename.gsub(".#{markup.extname}", '')
        css = markup.read.escape_literals
       
        script_items.instance_eval do
          << "_.jSilver.#{name} = \"<style>#{css}</style>\";"
          << "_(function() { _('head').append(_.jSilver.#{name});)});"
        end
      end
    end
    
    def markup
      JSilver.glob{/'views'/'**'/'*.html'}.each do |markup|
        name = markup.basename.gsub(".#{markup.extname}", '')
        html = markup.read.escape_literals
       
        script_items << "_.jSilver.#{name} = \"#{html}\";"
      end
    end
    
    def vendor
      script_items += JSilver.glob{/'vendor'/'**'/'*.js'}
    end
  end
end
