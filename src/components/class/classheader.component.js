import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
  } from "@material-tailwind/react";
  
  export function Classheader(data) {
    return (
      <div className="py-4 ">
      <Card
        shadow={false}
        className="relative grid h-auto w-full  items-end justify-center overflow-hidden text-center p-0"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="absolute inset-0 m-0 h-full  rounded-md p-0 w-full  bg-[url('https://www.gstatic.com/classroom/themes/img_read.jpg')] bg-cover bg-center"
        >
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t" />
        </CardHeader>
        <CardBody className="relative py-14 px-6 md:px-12 left-0 object-left-bottom">
            <div className="static">
          <Typography
            variant="h2"
            color="white"
            className="mb-6 font-medium leading-[1.5]"
          >
            {data.data.className}
          </Typography>
          <Typography variant="h5" className="mb-4 text-gray-100">
           {data.data.description}
          </Typography>
          </div>
        </CardBody>
      </Card>
      </div>
    );
  }