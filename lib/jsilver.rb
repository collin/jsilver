require 'rubygems'
require 'pathname'

Pathname.send :alias_method, :/, :+

module JSilver
  class << self
    def root
      @root||= Pathname.new(File.dirname __FILE__)
    end
    
    def glob &block
      Pathname.glob root.instance_eval(&block)
    end
  end
end
