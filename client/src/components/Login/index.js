import { useState } from 'react';

import { Box, Container, Paper } from '@mui/material';
import { TextField, Button, Typography } from '@mui/material';

function Login() {
    const [login, setLogin] = useState({
        username: '',
        password: '',
    });

    const handleLogin = (e) => {
        setLogin(existingsValues => ({
            ...existingsValues,
            [e.target.name]: e.target.value
        }));

        console.log(login);
    };

    const textField = [
        {id: 'username', label: 'Username'},
        {id: 'password', label: 'Password'},
    ]

    return (
        <Container
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '50px'
            }}
        >
            <Box>
                <img src={ require('../../assets/tooth/Tooth_slogan.png') } alt='Slogan of Auth'/>
            </Box>

            <Paper
                elevation={24}
                sx={{
                    width: '405px',
                    height: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '1px solid lightgray',
                    gap: '20px',
                    padding: '10px'
                }}
            >
                <Typography sx={{ fontFamily: 'Angkor', marginTop: '10px'}} variant='h4'>Sign In</Typography>

                {textField.map((input) => <TextField
                    key={input.id}
                    type={input.id === 'password' ? 'password' : ''}
                    id={input.id}
                    name={input.id}
                    label={input.label}
                    variant='outlined'
                    value={login[input.id]}
                    onChange={handleLogin}
                    sx={{
                        width: '250px',
                        mt: (input.id === "username" ? '20px' : '0px')
                    }}
                    
                />)}
                
                <Button
                    variant='contained'
                    sx={{
                        width: '250px',
                        height: '50px',
                        marginTop: '30px'
                    }}
                >
                    <Typography sx={{ fontWeight: 'bold'}}>Sign In</Typography>
                </Button>
            </Paper>
        </Container>
    );
}

export default Login;