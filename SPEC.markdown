_yay vaporware_

=== Keybindings ===
All keybindings are defaults they may be changed through the control panel.

=== Macros ===
Macros and sharing may be managed by the control panel.

Macros are repeatable sets of actions. They may be recorded and played back. Macros may be shared. Shared macros are protected by namespaces.

For the love of god READ shared macrs or trust your sources.

=== P2P ===
As a first option, jSilver uses Legs to create a Peer to Peer network to share macros.

A central server helps broker connections.

Should that P2P be impossible, the central server will step in the fill the roll of the P2P network.


=== Context Stack ===
A stack of jQuery objects. If there is not context the default context is jQuery(document);

Methods that have a side effect go onto the context stack. Their side effect may be reversed by backing up the stack.

=== Context Stack Editor ===
Similar to an abstract syntax tree for javascript.

With editing features.

It is possible to request an edit to the tree be made that would not make sense or force the destruction of other parts of the tree. This is okay, but one must confirm when trying to do such things.


==== Combination:Action ====
_Ctrl+Left_
Step out of the current node of the tree.

_Ctrl+Right_
Step into the current node of the tree.

_Ctrl+Up_
Select the previous node in the tree.

_Ctrl+Down_
Select the next node in the tree.

_Ctrl+Shift+Left_
Move the current node of the tree before its parent.

_Ctrl+Shift+Right_
Prepend the curret node of the tree to its next sibling.

_Ctrl+Shift+Up_
Move the current node of the tree before its previous sibling. 

_Ctrl+Shift+Down_
Move the current node of the tree after its next sibling.

_Ctrl+H_
Toggle 'visibility' of the current node, see what it would look like removed without actulally removing it.

_Del_
Remove the current node.

_Tab_
Select the next atom in this node.

_Shift+Tab_
Select the previous atom in this node.

_Enter_
Go to normal editing mode in the context of this part of the tree. If the name of a method call is selected the console used to specify that method will be opened. Upon pressing Enter or Escape you will be returned to the Context Stack Editor.

_Shift+Enter_
Same as Enter, except upon completion you will not be returned to the Context Stack Editor.

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

_/record_
Begin recording a macro. You will be asked to name this macro. You will get a blank slate to work in. You may namespace your own macros.

_/record/:macro_name_
Re-enter recording a macro. Shared macros will be forked. (Merging may not be possible, but the owner of a macro re-naming the macro to your fork is certainly possible.)

_/stop_
Stop recording/editing a macro.

_/:macro_name_
Play back a macro. Imported macros will be accessed: /:namespace/:macro_name

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

_Ctrl+H_
Toggle 'visibility' of the current node, see what it would look like removed without actulally removing it.

_Del_
Remove the current node.
