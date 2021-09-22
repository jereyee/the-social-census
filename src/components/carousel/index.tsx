import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useEmblaCarousel } from "embla-carousel/react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

import styles from "../../styles/modules/carousel.module.css";
import { MotionBox } from "components/motion";

import { DotButton } from "./Buttons";

export const Carousel = () => {
  const slides = [
    {
      img: (
        <Image
          src="/homepage/screenshot1.png"
          layout="fill"
          objectFit="contain"
          alt="App Screenshot 1"
        />
      ),
      heading: "Answer simple, yet <br/> thought-provoking questions.",
      subText: "Or if you're uncomfortable, just skip!",
    },
    {
      img: (
        <Image
          src="/homepage/screenshot2.png"
          layout="fill"
          objectFit="contain"
          alt="App Screenshot 2"
        />
      ),
      heading: "See the results, <br/> join the conversation.",
      subText: "",
    },
  ];

  const [viewportRef, embla] = useEmblaCarousel({
    skipSnaps: false,
    loop: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [scrollSnaps, setScrollSnaps] = useState<any[]>([]);

  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  return (
    <VStack spacing={6}>
      <div className={styles.embla} ref={viewportRef}>
        <div className={styles.embla__container}>
          {slides.map((slide, index) => (
            <MotionBox
              opacity={selectedIndex === index ? "100%" : "0"}
              position="relative"
              minWidth="100"
              paddingLeft="10px"
              key={index}
            >
              <MotionBox
                w="clamp(330px, 80vw, 40vh)"
                h="40vh"
                position="relative"
              >
                {slide.img}
              </MotionBox>
              <VStack
                px="5%"
                spacing={2}
                mt={2}
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Heading
                  as="h3"
                  variant="heading3"
                  dangerouslySetInnerHTML={{ __html: slide.heading }}
                />
                <Text variant="body" color="#CFCFCF">
                  {slide.subText}
                </Text>
              </VStack>
            </MotionBox>
          ))}
        </div>
      </div>

      <HStack spacing={1}>
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </HStack>
    </VStack>
  );
};
