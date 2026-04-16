export function animateIfReady(
  order,
  userCard,
  centerTable,
  setFromP,
  setToP,
  setDiaplayA
) {
  if (
    userCard &&
    centerTable &&
    typeof userCard.measure === "function" &&
    typeof centerTable.measure === "function"
  ) {
    (() => {
      userCard.measure((fx, fy, width, height, px, py) => {
        const fromPos = { x: px, y: py };

        centerTable.measure((cfx, cfy, cwidth, cheight, cpx, cpy) => {
          const toPos = {
            x: cpx + cwidth / 2 - 30,
            y: cpy + cheight / 2 - 45,
          };
          //So that if user says show then and cards are corret we will sned cards form table to the user
          if (order) {
            setFromP(fromPos);
            setToP(toPos);
            setDiaplayA(true);
          } else {
            setFromP(toPos);
            setToP(fromPos);
            setDiaplayA(true);
          }
        });
      });
    })();
  }
}
