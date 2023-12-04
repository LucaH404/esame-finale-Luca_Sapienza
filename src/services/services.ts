import axios from "axios";
const url = "";
export const fetchUsers = async () => {
    try {
        const response = await axios.get(url)
        console.log(response.data)
    }
    catch (err) {

    }
}