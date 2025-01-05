import { Popover as ChakraPopover, Portal } from "@chakra-ui/react";
import { CloseButton } from "./close-button";
import * as React from "react";
import { useColorMode } from "./color-mode";

interface PopoverContentProps extends ChakraPopover.ContentProps {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
}

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverContentProps
>(function PopoverContent(props, ref) {
  const { portalled = true, portalRef, ...rest } = props;
  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ChakraPopover.Positioner>
        <ChakraPopover.Content ref={ref} {...rest} />
      </ChakraPopover.Positioner>
    </Portal>
  );
});

export const PopoverArrow = React.forwardRef<
  HTMLDivElement,
  ChakraPopover.ArrowProps
>(function PopoverArrow(props, ref) {
  const {colorMode} = useColorMode();
  return (
    <ChakraPopover.Arrow {...props} ref={ref}>
      <ChakraPopover.ArrowTip style={
        { 
          backgroundColor: colorMode === "light"
            ? "rgb(226 232 240 / var(--tw-bg-opacity, 1))"
            : "rgb(71 85 105 / var(--tw-bg-opacity, 1))",
          zIndex: -1
        }
      } />
    </ChakraPopover.Arrow>
  );
});

export const PopoverCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraPopover.CloseTriggerProps
>(function PopoverCloseTrigger(props, ref) {
  return (
    <ChakraPopover.CloseTrigger
      position="absolute"
      top="1"
      insetEnd="1"
      {...props}
      asChild
      ref={ref}
    >
      <CloseButton size="sm" />
    </ChakraPopover.CloseTrigger>
  );
});

export const PopoverTitle = ChakraPopover.Title;
export const PopoverDescription = ChakraPopover.Description;
export const PopoverFooter = ChakraPopover.Footer;
export const PopoverHeader = ChakraPopover.Header;
export const PopoverRoot = ChakraPopover.Root;
export const PopoverBody = ChakraPopover.Body;
export const PopoverTrigger = ChakraPopover.Trigger;
