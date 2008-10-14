require 'rubygems'
require 'continuous_builder'

module JSilver
  class Builder < ContinuousBuilder
    watches :javascripts,
      :wait_for_all_edits => true,
      

    
    def bookmarklet
    
    end
  end
end
