jSilver
======================
Fucks up your cristmas.

#### gem dependencies
 * collin-continuous_builder
 
#### non-gem dependencies
 * http://orbited.org/wiki/Installation Version 0.7.x of Orbited
 
#### development tools
When developing, run

`$ ruby tools/build.rb`

This script builds the project and runs tests as you edit files.

`$ orbited --config=config/orbited.cfg

This server communicates with the build script to run tests in a browser as you edit files.

Open http://localhost:8000/specs/runner.html in a web browser. Open in all platforms you want tests to run on.
Running browsers do not have to be on your local machine. As long as they can connect to the server, they can run tests.

Test results can be seen in the target browsers, but a nicer looking output will go to the console in which the build script is running.

> Released under the "Don't Be A Dick" license.
>
> Don't be a dick, and everything will be cool.
