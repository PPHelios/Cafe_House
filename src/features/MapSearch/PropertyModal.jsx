import { Modal, Title, Text, Box, Image, ScrollArea } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
function PropertyModal({ modalData, opened, close }) {
  console.log(modalData);
  let slides = null;
  const imgUrls = ()=>{
    
  }
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
               
                  
              {modalData && <Carousel.Slide >
                  <Image
                    src={modalData?.get("pic0")?._url
                    }
                    alt="property picture"
                  />
                </Carousel.Slide>}
                {modalData?.get("pic1")?._url && <Carousel.Slide >
                  <Image
                    src={modalData.get("pic1")._url
                    }
                    alt="property picture"
                  />
                </Carousel.Slide>}
                {modalData?.get("pic2")?._url && <Carousel.Slide >
                  <Image
                    src={modalData.get("pic2")._url
                    }
                    alt="property picture"
                  />
                </Carousel.Slide>}
                {modalData?.get("pic3")?._url && <Carousel.Slide >
                  <Image
                    src={modalData.get("pic3")._url
                    }
                    alt="property picture"
                  />
                </Carousel.Slide>}
              </Carousel>
              <Text fz="sm" fw={500}>Price: {modalData?.get("price")} LE</Text>
             <Text fz="sm" >Area: {modalData?.get("area")} m</Text>
             <Text fz="sm" >Rooms: {modalData?.get("room")}</Text>
             <Text fz="sm" >Baths: {modalData?.get("bath")}</Text>
           
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
}

export default PropertyModal;
