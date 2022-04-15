import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
`;

const Box = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(238, 122, 247, 0.9);
  border-radius: 20px;
  height: 250px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SwitchButton = styled(motion.button)`
  display: block;
  width: 100px;
  height: 40px;
  font-size: 1.15rem;
  border-radius: 8px;
  border: none;
  color: blue;
`;

const Circle = styled(motion.div)`
  background-color: rgb(255, 255, 255);
  height: 5vw;
  width: 5vw;
  border-radius: 50%;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" }
};

function App() {
  const [id, setId] = useState<null | string>(null);
  const [clicked, setClicked] = useState(false);

  return (
    <Wrapper>
      <Grid>
        {["1,1,1", "2,0,1", "3,1,0", "4,0,0"].map((item, idx) => {
          const [, originX, originY] = item.split(",");
          return (
            <Box
              onClick={() => setId(item)}
              key={item}
              layoutId={item}
              style={{ originX: Number(originX), originY: Number(originY) }}
              whileHover={{ scale: 1.2 }}
            >
              {idx === 1 && !clicked && <Circle layoutId="circle" />}
              {idx === 2 && clicked && <Circle layoutId="circle" />}
            </Box>
          );
        })}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box
              layoutId={id}
              style={{
                width: 400,
                height: 200,
                backgroundColor: "rgb(255,255,255)"
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <SwitchButton
        onClick={() => setClicked(prev => !prev)}
        whileFocus={
          clicked
            ? { scale: 1.2, color: "orange" }
            : { scale: 1, color: "blue" }
        }
      >
        Switch
      </SwitchButton>
    </Wrapper>
  );
}

export default App;
