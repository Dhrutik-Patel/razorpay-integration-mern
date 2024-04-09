import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import Card from "./Card";

const Home = () => {
    const checkoutHandler = async (amount) => {
        const key = await fetch("http://localhost:5000/api/config/razorpay");
        const keyData = await key.json();

        const response = await fetch("http://localhost:5000/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount }),
        });
        const data = await response.json();

        const options = {
            key: keyData.key,
            amount: data.amount,
            currency: data.currency,
            name: "Dhrutik Patel",
            description: "Test Transaction",
            image: "https://avatars.githubusercontent.com/u/86155432?s=400&u=5e346fb8ad4b4aa0c3f971056a55c3c89f6108f0&v=4",
            order_id: data.id,
            callback_url: "http://localhost:5000/api/payment/success",
            prefill: {
                name: "Dhrutik Patel",
                email: "dhrutikpatel2017@gmail.com",
                contact: "7265996831",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <Box>
            <Stack
                direction={"row"}
                spacing={4}
                h={"100vh"}
                justify={"center"}
                align={"center"}
            >
                <Card
                    amount={5000}
                    img={
                        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRKj8NxFZGTq2Duw3kub7bAM6b-7zsd_1oF5GkGsknP4ex-A8Dk"
                    }
                    checkoutHandler={checkoutHandler}
                />

                <Card
                    amount={10000}
                    img={
                        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRKj8NxFZGTq2Duw3kub7bAM6b-7zsd_1oF5GkGsknP4ex-A8Dk"
                    }
                    checkoutHandler={checkoutHandler}
                />
            </Stack>
        </Box>
    );
};

export default Home;
