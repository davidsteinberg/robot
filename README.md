# The Robot

It's a dancing robot!

### The robot

The robot is composed of 10 rectangles representing its head, torso, and arm and leg tops and bottoms.

A new pose is generated each beat. To do so, each rectangle is randomly rotated within a range of allowed angles, and they are all pinned to each other using some good ol' geometry.

The pose is randomly shifted left or right, making sure to keep the robot mostly on-screen. The lowest leg's bottom is pinned to the bottom of the screen.

### The rhythm

After 4 taps, the time between each tap is averaged. This is used to calculate the song's beats per minute. If a tap doesn't occur within 2 seconds, the previous taps are cleared.

A metronome is set to tick every beat, causing a new pose to be generated. The metronome pauses when the screen is tapped and restarts after the fourth sequential tap.

Due to JavaScript's inherent lack of accurate timing using `setTimeout, the timing is based on CSS animation iterations. If you know of a more elegant solution, I'd love to know!

### The project

The app is built with [React][1], using [Create React App][2] to set up the project. [Prettier][3] is used to format the code.

### The license

The software in this project is released under an [MIT license][4].

### The future

1. Offer a mechanism to immediately switch to half or double bpm, so you don't have to interrupt movement to tap it out.
2. Allow for a wider range of limb movement. Base new positions off of previous positions and bottom angle ranges off of top angles.
3. "Listen" using the microphone and determine bpm, altering speed according to song changes.

[1]: https://reactjs.org
[2]: https://create-react-app.dev
[3]: https://prettier.io
[4]: LICENSE
