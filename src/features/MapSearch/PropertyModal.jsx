import { Modal, Title, Text, Box, Image, ScrollArea } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
function PropertyModal({ modalData, opened, close }) {
  console.log(modalData);
  let slides = null;
  if (modalData) {
    slides = modalData.images.map((url) => (
      <Carousel.Slide key={url}>
        <Image
          src={
            new URL(`../../assets/images/${url}HQ.webp`, import.meta.url).href
          }
          alt="vv"
        />
      </Carousel.Slide>
    ));
  }

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
          <Title order={3}> {modalData.title}</Title>
            <Box>
              <Carousel
                maw={600}
                mx="auto"
                slideSize="100%"
                slideGap="xs"
                controlsOffset="xs"
                withIndicators
              >
                {slides && slides}
              </Carousel>
           
              <Text fz="md" fw={500}>Price: {modalData?.price} LE</Text>
              <Text fz="md">Area: {modalData?.area} sqm</Text>
              <Text fz="md">Rooms: {modalData?.rooms}</Text>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
}

export default PropertyModal;
