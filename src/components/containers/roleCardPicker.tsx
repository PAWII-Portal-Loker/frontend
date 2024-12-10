import { scaleVariants } from "@/common/types/animationVariants";
import { Card, Stack } from "@chakra-ui/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";

interface RoleCardPickerProps {
  selectedRole: string | null;
  setSelectedRole: (role: "COMPANY" | "JOB_SEEKER") => void;
}
const RoleCardPicker = ({
  selectedRole,
  setSelectedRole,
}: RoleCardPickerProps) => {
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
          className={clsx(
            "text-center cursor-pointer",
            selectedRole === "COMPANY"
              ? "bg-green-100 outline-none border-2 border-green-500 rounded-lg"
              : "hover:bg-green-100 hover:scale-105 transition-all duration-200",
          )}
        >
          <Card.Body className="fex flex-col justify-between">
            <Image
              src="/company.png"
              alt="Company"
              width={120}
              height={120}
              className="mx-auto"
            />
            <div>
              <Card.Title className="font-semibold" mt={4}>
                Company
              </Card.Title>
              <Card.Description mt={2} fontSize="sm">
                Register as a company
              </Card.Description>
            </div>
          </Card.Body>
        </Card.Root>
        <Card.Root
          onClick={() => setSelectedRole("JOB_SEEKER")}
          className={clsx(
            "text-center cursor-pointer",
            selectedRole === "JOB_SEEKER"
              ? "bg-green-100 outline-none border-2 border-green-500 rounded-lg"
              : "hover:bg-green-100 hover:scale-105 transition-all duration-200",
          )}
        >
          <Card.Body className="fex flex-col justify-between">
            <Image
              src="/job-seeker.png"
              alt="Job Seeker"
              width={100}
              height={120}
              className="mx-auto"
            />
            <div>
              <Card.Title className="font-semibold" mt={4}>
                Job Seeker
              </Card.Title>
              <Card.Description mt={2} fontSize="sm">
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
