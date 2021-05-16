type Props = {
  className?: string;
};

const BubbleBg = ({ className = "" }: Props) => (
  <div className={`${className}`}>
    <style jsx>{`
      .wrapper {
        background-image: url("/bubbles.svg");
        perspective: 1000px;
        perspective-origin: 50% 50%;
        animation: animation 100s linear infinite;
      }

      @keyframes animation {
        100% {
          background-position: 0px -3000px;
        }
      }
    `}</style>
    <div className="wrapper flex w-full h-screen bg-gray-900" />
  </div>
);

export default BubbleBg;
