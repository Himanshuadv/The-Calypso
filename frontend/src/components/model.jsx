import  ReactDOM from "react-dom";



function Model({onClose, actionBar, children}){


    //understanding css is key to understand model
   return ReactDOM.createPortal(
 <div>
    {/*  styling model like making btn right an and giving space .but still hw is fix styling of model make it responsive */}
        <div className="fixed inset-0 bg-gray-300 opacity-80" ></div>
        <div className="fixed  inset-40 p-10 text-center bg-white"> 
        <div className="flex flex-col justify-center">
        {children}
        <div className="fixed top-44 right-52 flex justify-end">
        {actionBar}
        </div>
        </div>

        </div>
    </div>,
    document.querySelector('.modal-container')
   );
}

export default Model;