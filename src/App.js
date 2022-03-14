import react, {useState} from "react";
import "./App.css";
import todo from "./todo2.png";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
// import { useState } from "react/cjs/react.production.min";

function App() {

    const [inputData, setInputData] = useState('');
    const [toggle, setToggle] = useState(true);
    const [items, setItems] = useState([]);
    const [editItem, setEditItem] = useState('');

    const inputDataHandle = ()=>{
      if(!inputData){

      }
      else if(inputData && !toggle){
        // in above line both are true
        setItems(
          items.map((element)=>
          {
            if(element.id === editItem){
              return{...element, name: inputData }
            }
            return element;
          })
        )
         setToggle(true);
      setInputData('');
      setEditItem(null);
      }
      else{
        const allInputData = {id: new Date().getTime().toString(), name:inputData }
        //above line is used for generating unique id beacuse when we edit something we need unique id..we use date function 
      setItems([...items, allInputData]);
      setInputData('');
    }
  }

    // wwhen user click on the edit button

    // 1:get the id and name of the data which user clicked to edit
    // 2:set the toggle mode to change the submit button into edit button
    // 3:now update the value of the setInputData with the new updated value to edit
    // 4:to pass the current element id to new state variable for reference
    
    const editHandle =(id)=>{
      // we get index as an event (element.id) from editHandle function.
      const editedItem = items.find((element)=>{
        return element.id === id;
      });
      setToggle(false);
      setInputData(editedItem.name);
      setEditItem(id);
    }

    const deleteHandle =(index)=>{
      // we get index as an event (element.id) from deleteHandle function.
      const updatedData = items.filter((element)=>{
        return index !== element.id;
      });
      setItems(updatedData);
    }

    
      const deleteAll = ()=>{
        setItems([]);
      }
    

  return (
    <>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col col-md-4 main-child">
            
            <figure className="mt-3 text-center">
              <img src={todo} alt="todo logo" style={{ height: "100px" }} />
              <figcaption>Add Your List Here</figcaption>
            </figure>
             

            {/* Add Item Section */}
            <div className="row justify-content-md-center mb-4 mt-4">
              <div className="col-auto">
                <input type="text" className="form-control" value={inputData} 
                onChange={(e)=>{setInputData(e.target.value)}}/>
              </div>
              <div className="col-auto">
                <span className="form-text">
                  {toggle? <i onClick={inputDataHandle}><FaPlus /></i> : <i onClick={inputDataHandle}><FaEdit /></i>}
                  
                </span>
              </div>
            </div>

            

            {/* item section */}  
              {items.map((element)=>{
                return(
                  <section className="row justify-content-md-center mt-2" key={element.id}>
                    <div className="col-auto list">
                {/* <input type="text" className="form-control text-white" value={element.name} /> */}
                <h5>{element.name}</h5>
                  
              </div>
              <div className="col-auto">
                <span className="form-text">
                  <i onClick={()=> deleteHandle(element.id)}>
                    <FaTrash />
                  </i>
                </span>
                <span className="form-text" style={{marginLeft:-20}}>
                  <i onClick={()=> editHandle(element.id)}>
                    <FaEdit />
                  </i>
                </span>
              </div>
                </section>
                )
              })}

             
            <div className="row justify-content-md-center mb-4 mt-4">
              <div className="col-auto">
           <button className="btn btn-danger" onClick={deleteAll}>Delete All</button>
           </div>
           </div>
           
           
             
          
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
