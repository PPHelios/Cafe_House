import { Modal, Title, Flex, Box, Image,   ActionIcon, Group,Anchor,Text ,Avatar,ScrollArea } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconPhoneCall,IconBrandWhatsapp  } from "@tabler/icons-preact";

import PlaceDetails from "../PlaceDetails/PlaceDetails";
import AgentCard from "../AgentCard/AgentCard";
function PropertyModal({ modalData, opened, close }) {

 // const agency = modalData?.get("agencyPointer")?.get("agencyName")

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
const phoneNumber = modalData?.get("agentPointer").attributes.phoneNumber
  return (
    <>
      {modalData && (
        <Modal
          size={{base:"md",sm:"xl"}}
          opened={opened}
          onClose={close}
          scrollAreaComponent={ScrollArea.Autosize}
        
        >
           
          <Box>
            <Title order={3} ta="center">  {modalData?.get("adName")}</Title>
            <Box h={2000}>
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
{/*          
                {modalData?.get("video1")?._url && (
                  <Carousel.Slide>
                    <video
                      src={modalData.get("video1")._url}
                      alt="property video"
                      video controls="controls"
                      type="video/mp4"
                    />
                  </Carousel.Slide>
                )} */}
            
              </Carousel>
             {modalData?.get("video0")?._url && <Box w={600} h={400} mx="auto" sx={{border:"1px solid black"}}> 
                       <video
                      src={modalData.get("video0")._url}
                      alt="property video"
                      video controls="controls"
                      type="video/mp4"
                      width="100%" height="100%"
                     
                     
                    />
                    </Box>}
              <Modal.Header>
            <Group position="center">
            <Avatar
              size={40}
              radius="xl"
              src={modalData?.get("agentPointer")?.get("profilePic")?._url}
              alt="agent profile picture"
            />
          </Group>
            <Group mt={10}>
            <ActionIcon variant="default" radius="md" size={36}>
              <IconPhoneCall size="1.1rem" stroke={1.5} color="blue"/>
            </ActionIcon>
            {/* <Text fz="md" fw={500}>{phoneNumber}</Text> */}
          </Group>
          <Anchor td="none" target="_blank" href={`https://wa.me/+2${phoneNumber}?text=I'm%20inquiring%20about%20the%20apartment%20listing%${modalData.get("adName")}`}>  
           <Group mt={10}>
           
            <ActionIcon variant="default" radius="md" size={36} >
              <IconBrandWhatsapp  size="1.1rem" stroke={1.5} color="blue"/>
            </ActionIcon>
            {/* <Text fz="md" fw={500}>{phoneNumber}</Text> */}
          </Group>
          </Anchor>
          </Modal.Header>
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
