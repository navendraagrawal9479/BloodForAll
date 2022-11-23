export const fetchUser = async () => {
    const response = await fetch('https://blood-donor-9b76a-default-rtdb.firebaseio.com/users/NGXSvTWrhk6fGRztLkX/user.json')
    const data = await response.json();
    console.log(data);
}
