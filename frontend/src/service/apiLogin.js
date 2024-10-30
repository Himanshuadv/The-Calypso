import axios from "axios";
export const signin = ()=>{
    // define signin logic
}
export const register = (data)=>{
    // define register logic with all needed information
   console.log(data);
   
    axios
      .post(`http://localhost:3000/api/v1/users/signup`, data,{withCredentials: true, credentials: 'include'})
      .then((response) => {
        // // alert(response.data.name);
        // // console.log(response.data.data);
        // toast.success("Welcome to Lite Lo!", {
        //   autoClose: 5000,
        // });
        // const name = response.data.data.user.name;
        // const id = response?.data.data.user._id
        // console.log(response.data.data.user.name);
        // localStorage.setItem("name", name);
        // localStorage.setItem("id",  id);
        console.log("response");
        
        console.log(response);
        
        return response;
        // navigate("/home");
      })
      .catch((error) => {
        // Handle error
        console.log(error);
        
        // let cleanedErrorMessage = err.replace(/^User validation failed: /, "");

        // let email = "";
        // let password = "";

        // const emailIndex = cleanedErrorMessage.indexOf("email:");
        // const passwordIndex = cleanedErrorMessage.indexOf("password:");

        // if (emailIndex !== -1) {
        //   const nextIndex = cleanedErrorMessage.indexOf(",", emailIndex);
        //   email = cleanedErrorMessage.substring(
        //     emailIndex + 7,
        //     nextIndex !== -1 ? nextIndex : cleanedErrorMessage.length
        //   );
        // }

        // if (passwordIndex !== -1) {
        //   const nextIndex = cleanedErrorMessage.indexOf(",", passwordIndex);
        //   password = cleanedErrorMessage.substring(
        //     passwordIndex + 10,
        //     nextIndex !== -1 ? nextIndex : cleanedErrorMessage.length
        //   );
        // }

        // if (email !== "") {
        //   toast.error(email, {
        //     autoClose: 20000,
        //     hideProgressBar: true,
        //     closeOnClick: true,
        //     theme: "colored",
        //   });
        // }
        // if (password !== "") {
        //   toast.error(password, {
        //     autoClose: 20000,
        //     hideProgressBar: true,
        //     closeOnClick: true,
        //     theme: "colored",
        //   });
        // }
      });


}