import React, { useEffect, useState } from 'react';
import { db } from './auth/firebase-config';
import { collection, getDocs, query, where } from "firebase/firestore";
import { Typography } from '@mui/material';
import { Stack, Box } from '@mui/system';
import RecentDonorCard from './RecentDonorCard';
import LoadingSpinner from './auth/LoadingSpinner';

const RecentDonors = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("lastDonated", "!=", ""));

        const getUsers = async () => {
            setLoading(true)
            const data = await getDocs(q);
            const dataRecieved = [];
            for (var i = 0; i < data.docs.length; i++) {
                const userData = data.docs[i].data();
                dataRecieved.push(userData);
                setUsers(dataRecieved);
            }
            setLoading(false);
        };
        getUsers();
    }, []);
    const sortedUsers = users.sort(
        (objA, objB) => new Date(objB.lastDonated) - new Date(objA.lastDonated),
    );
    sortedUsers.slice(0, 5)

    if(loading)return <Box display='flex' flexDirection='column' alignItems='center' justifyContent="center">
        <LoadingSpinner />
    </Box>

    return (
        <div>
            <Typography variant='h5' style={{fontWeight: 'bold', textAlign: 'center', marginTop: '15px'}}>
                Recent Donors
            </Typography>
            <Stack direction='row' flexWrap='wrap' gap={2} alignItems='center' justifyContent='center'>
                {
                    sortedUsers.map(user => {
                        return <RecentDonorCard name={user?.name} date={user?.lastDonated} />
                    })
                }
            </Stack>
        </div>
    );
};

export default RecentDonors;
