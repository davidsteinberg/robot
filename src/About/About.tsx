import "./About.css";
import { useRef } from "react";

const About = (p: { hidden: boolean }) => {
  const { hidden } = p;
  const ref = useRef<HTMLDivElement>(null);

  // Scroll back to the top when hidden
  const onTransitionEnd = () => {
    if (hidden) {
      ref.current?.scrollTo({ top: 0 });
    }
  };

  return (
    <div className={`About ${hidden ? "hidden" : ""}`} {...{ onTransitionEnd }}>
      <div className="container" {...{ ref }}>
        <div className="header">The robot</div>
        <div className="text">
          <p>
            The robot is composed of 10 rectangles representing its head, torso,
            and arm and leg tops and bottoms.
          </p>
          <p>
            A new pose is generated each beat. To do so, each rectangle is
            randomly rotated within a range of allowed angles, and they are all
            pinned to each other using some good ol&rsquo; geometry.
          </p>
          <p>
            The pose is randomly shifted left or right, making sure to keep the
            robot mostly on-screen. The lowest leg&rsquo;s bottom is pinned to
            the bottom of the screen.
          </p>
        </div>
        <div className="header">The rhythm</div>
        <div className="text">
          <p>
            After 4 taps, the time between each tap is averaged. This is used to
            calculate the song&rsquo;s beats per minute. If a tap doesn&rsquo;t
            occur within 2 seconds, the previous taps are cleared.
          </p>
          <p>
            A metronome is set to tick every beat, causing a new pose to be
            generated. The metronome pauses when the screen is tapped and
            restarts after the fourth sequential tap.
          </p>
        </div>
        <div className="text">
          Check out the source on{" "}
          <a href="https://github.com/davidsteinberg/robot">GitHub</a>.
        </div>
      </div>
    </div>
  );
};

export default About;
