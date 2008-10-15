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

`$ orbited --config=config/orbited.cfg`

This server communicates with the build script to run tests in a browser as you edit files.

If you aren't running 0.7.x of Orbited with the embedded Morbid STOMP server. Or if you don't have another Stomp server you want to use, run this:

`$ easy_install morbid`

`$ morbid`
   
Open http://localhost:8001/specs/runner.html in a web browser. Open in all platforms you want tests to run on.
Running browsers do not have to be on your local machine. As long as they can connect to the server, they can run tests.

Test results output will go to the console in which the build script is running.

![Console output of test results](http://img410.imageshack.us/img410/9114/screenshotwt7.png "Build Console")

> Released under the "Don't Be A Dick" license.
>
> Don't be a dick, and everything will be cool.
