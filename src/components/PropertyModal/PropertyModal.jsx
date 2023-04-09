import { Modal, Title, Flex, Box, Image, ScrollArea } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

import PlaceDetails from "../PlaceDetails/PlaceDetails";
import AgentCard from "../AgentCard/AgentCard";
function PropertyModal({ modalData, opened, close }) {

  const agency = modalData?.get("agencyPointer")?.get("agencyName")

  // let slides = null;
  // const imgUrls = () => {};
  // if (modalData) {
  //   slides = modalData.map((url) => (
  //     <Carousel.Slide key={url}>
  //       <Image
  //         src={
  //           new URL(`../../assets/images/${url}HQ.webp`, import.meta.url).href
  //         }
  //         alt="vv"
  //       />
  //     </Carousel.Slide>
  //   ));
  // }

  return (
    <>
      {modalData && (
        <Modal
          size="xl"
          opened={opened}
          onClose={close}
          scrollAreaComponent={ScrollArea.Autosize}
        
        >
          <Box>
            <Title order={3}> {modalData?.get("adName")}</Title>
            <Box>
              <Carousel
                maw={600}
                mx="auto"
                slideSize="100%"
                slideGap="xs"
                controlsOffset="xs"
                withIndicators
              >
                {modalData && (
                  <Carousel.Slide>
                    <Image
                      src={modalData?.get("pic0")?._url}
                      alt="property picture"
                    />
                  </Carousel.Slide>
                )}
                {modalData?.get("pic1")?._url && (
                  <Carousel.Slide>
                    <Image
                      src={modalData.get("pic1")._url}
                      alt="property picture"
                    />
                  </Carousel.Slide>
                )}
                {modalData?.get("pic2")?._url && (
                  <Carousel.Slide>
                    <Image
                      src={modalData.get("pic2")._url}
                      alt="property picture"
                    />
                  </Carousel.Slide>
                )}
                {modalData?.get("pic3")?._url && (
                  <Carousel.Slide>
                    <Image
                      src={modalData.get("pic3")._url}
                      alt="property picture"
                    />
                  </Carousel.Slide>
                )}
                {modalData?.get("pic4")?._url && (
                  <Carousel.Slide>
                    <Image
                      src={modalData.get("pic4")._url}
                      alt="property picture"
                    />
                  </Carousel.Slide>
                )}
                {modalData?.get("pic5")?._url && (
                  <Carousel.Slide>
                    <Image
                      src={modalData.get("pic5")._url}
                      alt="property picture"
                    />
                  </Carousel.Slide>
                )}
                {modalData?.get("pic6")?._url && (
                  <Carousel.Slide>
                    <Image
                      src={modalData.get("pic6")._url}
                      alt="property picture"
                    />
                  </Carousel.Slide>
                )}
                {modalData?.get("pic7")?._url && (
                  <Carousel.Slide>
                    <Image
                      src={modalData.get("pic7")._url}
                      alt="property picture"
                    />
                  </Carousel.Slide>
                )}
                {modalData?.get("pic8")?._url && (
                  <Carousel.Slide>
                    <Image
                      src={modalData.get("pic8")._url}
                      alt="property picture"
                    />
                  </Carousel.Slide>
                )}
                {modalData?.get("pic9")?._url && (
                  <Carousel.Slide>
                    <Image
                      src={modalData.get("pic9")._url}
                      alt="property picture"
                    />
                  </Carousel.Slide>
                )}
                {modalData?.get("pic10")?._url && (
                  <Carousel.Slide>
                    <Image
                      src={modalData.get("pic10")._url}
                      alt="property picture"
                    />
                  </Carousel.Slide>
                )}
                {modalData?.get("pic11")?._url && (
                  <Carousel.Slide>
                    <Image
                      src={modalData.get("pic11")._url}
                      alt="property picture"
                    />
                  </Carousel.Slide>
                )}
                {modalData?.get("pic12")?._url && (
                  <Carousel.Slide>
                    <Image
                      src={modalData.get("pic12")._url}
                      alt="property picture"
                    />
                  </Carousel.Slide>
                )}
                {modalData?.get("pic13")?._url && (
                  <Carousel.Slide>
                    <Image
                      src={modalData.get("pic13")._url}
                      alt="property picture"
                    />
                  </Carousel.Slide>
                )}
                {modalData?.get("pic14")?._url && (
                  <Carousel.Slide>
                    <Image
                      src={modalData.get("pic14")._url}
                      alt="property picture"
                    />
                  </Carousel.Slide>
                )}
              </Carousel>
              <Flex py={30} direction={{base:"column",xs:"row"}} justify={"center"} gap={10}>
                 <PlaceDetails item={modalData} modal={true} />
                 <AgentCard item={modalData}/>
              </Flex>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
}

export default PropertyModal;
