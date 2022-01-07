import { useNavigate } from 'react-router';
import { Container, Button, TitleSizeThree, Line} from '../Style';

type LogoutProps = {
    removeCookie: any,
    setToken: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const LogOut = ({removeCookie, setToken}: LogoutProps) => {

    const navigate = useNavigate();

    const handleConfirmClick = () => {
        removeCookie('auth-token', {path: '/'})
        setToken(undefined)
        navigate('/')
    }

    const handleCancelClick = () => {
        navigate('/')
    }

    return (
        <Container width='60%' marginTop='50px' display='flex' flexDirection='column'>
            <TitleSizeThree fontSize='30px'>Are you sure you want to logout ? </TitleSizeThree>
            <Line>
                <Button margin='10px' onClick={handleConfirmClick}>Confirm</Button>
                <Button margin='10px' onClick={handleCancelClick}>Cancel</Button>
            </Line>
        </Container>
    )
};