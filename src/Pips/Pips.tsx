import "./Pips.css";

const Pips = (p: { hidden: boolean; tapCount: number }) => {
  const { hidden, tapCount } = p;
  return (
    <svg className={`Pips ${hidden ? "hidden" : ""}`} viewBox="0 0 1000 100">
      {Array.from({ length: 4 }).map((_, index) => (
        <circle
          key={index}
          className="pip"
          cx={index * 250 + 125}
          cy={50}
          r={30}
          fill={tapCount > index ? "currentColor" : "none"}
          stroke="currentColor"
        ></circle>
      ))}
    </svg>
  );
};

export default Pips;
