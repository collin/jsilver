= jSilver =
======================

***** up your christmas.

_yay vaporware_

=== Context Stack ===
A stack of jQuery objects. If there is not context the default context is jQuery(document);

Methods that have a side effect go onto the context stack. Their side effect may be reversed by backing up the stack.

=== Context Stack Editor ===
Similar to an abstract syntax tree for javascript.

With editing features.+

=== Usage ===
*Usage shows default key bindings*

==== Combination:Action ====

_Esc_
Dismiss the current console.

_Enter_
Execute the current console.

_$_ 
Opens a console to type a css query. Pressing enter in this console _clears_ the context stack and adds that query to the context stack

_&_
Opens a console to type a css query. This query is filtered to the current context stack.

_._
Opens a console to type a jQuery method name. Pressing enter in this console prompts for the entry of arguments if relevant. Then the method executes. If the method returns a jQuery object it is pushed to the context stack. Methods that have a side effect(hide, remove, data, etc.) also go onto the context stack. Their side effect may be reversed by backing up the stack.

_>_
Go forward in the stack.

_<_ 
Go backward in the stack.

_/_
Open a console to enter special session commands.

===== Session Commands =====
_/print_
Print the current session to a pop up box for easy copy/paste.

_/edit_
Open an editable view for the context stack. Enable/disable, undo/redo, re-order and traverse your current position in the context stack.

_/clear_
Clears the context stack. Undoing all side effects caused by the stack.

_/reset_
Reset and modifications made by the editor in the /edit command.

==== Combination:Action ====
All these apply to the current context.

_Ctrl+Left_
Short for $.fn.parent()

_Ctrl+Right_
Short for $.fn.children(':first')

_Ctrl+Up_
Short for $.fn.prev()

_Ctrl+Down_
Short for $.fn.next()


==== Combination:Manipulation
_Ctrl+Shift+Left_
Moves elements in the current context to the position after their parent.

{{{
  %parent
    %child
  
  /becomes
  
  %parent
  %child
}}}

_Ctrl+Shift+Right_
Prepends elements in the current context to their next sibling.

{{{
  %current_context
  %sibling
  
  /becomes
  
  %sibling
    %current_context
}}}

_Ctrl+Shift+Up_
Moves elements before their previous sibling.

{{{
  %sibling
  %current_context
  
  /becomes
  
  %current_context
  %sibling
}}}

_Ctrl+Shift+Down_
Moves elements after their next sibling.

{{{
  %current_context
  %sibling
  
  /becomes
  
  %sibling
  %current_context
}}}

======================
Released under the "Don't Be A Dick" license.

Don't be a dick, and everything will be cool.
