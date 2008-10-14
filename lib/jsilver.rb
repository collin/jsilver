require 'rubygems'
require 'pathname'

Pathname.send :alias_method, :/, :+

class Symbol
  def to_proc
    Proc.new { |obj, *args| obj.send(self, *args) }
  end
end

class String
  def escape_literals
    gsub(/\"/ , "\\\"")
  end
  
  def flat
    gsub("\n", '').
    gsub("\r\n", '')
  end
end

module JSilver
  module Orbited
    Host = 'localhost'
    Port = '8001'
  end
  
  class << self
    def root
      @root||= Pathname.new(Pathname.new(File.dirname(__FILE__)).expand_path)/'..'
    end
    
    def glob &block
      Pathname.glob root.instance_eval(&block)
    end
  end
end
