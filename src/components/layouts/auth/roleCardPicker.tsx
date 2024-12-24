import { Card, Stack } from "@chakra-ui/react";
import { scaleVariants } from "@consts/animationVariants";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";

interface RoleCardPickerProps {
  selectedRole: string | null;
  setSelectedRole: (role: "COMPANY" | "JOB_SEEKER") => void;
}
const RoleCardPicker = (props: RoleCardPickerProps) => {
  const { selectedRole, setSelectedRole } = props;
  return (
    <motion.div
      variants={scaleVariants}
      animate="animate"
      initial="initial"
      exit="exit"
    >
      <Stack direction={["column", "row"]} justifyContent={"space-evenly"}>
        <Card.Root
          onClick={() => setSelectedRole("COMPANY")}
          height={"13rem"}
          className={clsx(
            "text-center cursor-pointer",
            selectedRole === "COMPANY"
              ? "bg-white outline-none rounded-lg"
              : "hover:bg-gray-100/90 bg-gray-300/85 hover:scale-105 transition-all duration-200"
          )}
        >
          <Card.Body className="flex flex-col justify-between">
            <Image
              src="/company.png"
              alt="Company"
              width={120}
              height={120}
              className="mx-auto"
            />
            <div className="my-auto">
              <Card.Title className="font-bold text-slate-700" fontSize={"2xl"}>
                Company
              </Card.Title>
              <Card.Description fontSize="sm" color={"gray.500"}>
                Register as a company
              </Card.Description>
            </div>
          </Card.Body>
        </Card.Root>
        <Card.Root
          onClick={() => setSelectedRole("JOB_SEEKER")}
          height={"13rem"}
          className={clsx(
            "text-center cursor-pointer",
            selectedRole === "JOB_SEEKER"
              ? "bg-white outline-none rounded-lg"
              : "hover:bg-gray-100/90 bg-gray-300/85 hover:scale-105 transition-all duration-200"
          )}
        >
          <Card.Body className="fex flex-col justify-between">
            <Image
              src="/job-seeker.png"
              alt="Job Seeker"
              width={110}
              height={120}
              className="mx-auto"
            />
            <div>
              <Card.Title className="font-bold text-slate-700" fontSize={"xl"}>
                Job Seeker
              </Card.Title>
              <Card.Description fontSize="sm" color={"gray.500"}>
                Register as a job seeker
              </Card.Description>
            </div>
          </Card.Body>
        </Card.Root>
      </Stack>
    </motion.div>
  );
};

export default RoleCardPicker;
