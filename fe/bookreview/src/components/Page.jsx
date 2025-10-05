import { MotionBox } from "../motion/Motion";
import { fadeIn } from "../motion/presets";
import { useMotionSafe } from "../motion/presets";

export default function Page({ children }) {
const safe = useMotionSafe();
return (
<MotionBox
variants={fadeIn(0)}
{...safe}
sx={{ minHeight: "calc(100vh - 64px)" }} // below AppBar
>
{children}
</MotionBox>
);
}