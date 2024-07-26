import React, { useEffect, useMemo, useState } from "react";
import { db } from "../firebase";
import  "firebase/firestore";
import { collection, doc, getDocs, limit, orderBy, query, startAfter, updateDoc } from "firebase/firestore";
import { ReactTable } from "../components/t";
import HeaderAdmin from '../components/HeaderAdmin'
import { Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";


const AdminCustomCakeOrder = () =>{
    const [posts, setPosts] = useState([]);
    const [lastKey, setLastKey] = useState("");
    const [nextPosts_loading, setNextPostsLoading] = useState(false);


    const postsFirstBatch = async () => {
        try {
            const data = await getDocs(query(collection(db, "customCake") , orderBy("email", "desc"), limit(5)));
            // console.log(data);
          let posts = [];
          let lastKey = "";
          data.docs.map((doc) =>  posts.push({ id: doc.id, value: doc.data() }))
          data.docs.map((doc)=> lastKey = doc.data().email)

        //   lastKey = docs.data().createdAt;;
          // console.log(posts);
          return { posts, lastKey };
        } catch (e) {
          alert("error",e);
        }
      }

      const postsNextBatch = async (key) => {
        try {
          const data = await getDocs(query(collection(db, "customCake")  , orderBy("email", "desc"), limit(5), startAfter(key)))

            // console.log(data);
    
          let posts = [];
          let lastKey = "";
          data.docs.map((doc) => posts.push({ id: doc.id, value: doc.data() }))
          data.docs.map((doc)=> lastKey = doc.data().email)
        //   lastKey = data.docs[data.docs.length-1];
          return { posts, lastKey };
        } catch (e) {
          console.log("Error",e);
        }
      }
    //   console.log(posts);
    useEffect(() => {
    // first 5 posts
        postsFirstBatch()
      .then((res) => {
        setPosts(res.posts);
        setLastKey(res.lastKey);
      })
      .catch((err) => {
        alert("Error:",err);
      });
  }, []);

  const handleComplete= async (id) =>{
    try{
        const q = doc(db, "customCake", `${id}`);
        await updateDoc(q, {
            orderStatus:"Completed"   
          })
          alert(`Status of OrderId ${id} has been updated`);
          // fetchMorePosts(lastKey)
    }
    catch(e){
        alert("Error",e);
    }
  }

  // console.log("this is last",lastKey.length);

  const fetchMorePosts = (key) => {
    if (key.length > 0) {
      setNextPostsLoading(true);
      postsNextBatch(key)
        .then((res) => {
          setLastKey(res.lastKey);
          // add new posts to old posts
          setPosts(posts.concat(res.posts));
          setNextPostsLoading(false);
        })
        .catch((err) => {
          alert("Error:",err);
          setNextPostsLoading(false);
        });
    }
  };

  const columns = useMemo(() =>
    [
      {
        Header: "ID",
        accessor: "id"
      },
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Mobile",
        accessor: "mobile"
      },
      {
        Header: "Cake Text",
        accessor: "cakeText"
      },
      {
        Header: "Flavor",
        accessor: "flavor"
      },
      {
        Header: "Shape",
        accessor: "shape"
      },
      {
        Header: "Size",
        accessor: "size"
      },
      {
        Header: "Theme",
        accessor: "theme"
      },
      {
        Header:"Topping",
        accessor:"topping"
      },
      {
        Header:"Extra Topping",
        accessor:"extraToppings"
      },
      {
        Header:"Type",
        accessor:"type"
      },
      {
        Header: "Address",
        accessor: "address"
      },
      {
        Header: "Price",
        accessor: "price"
      },
      {
        Header:"Delivery Date",
        accessor:"date"
      },
      {
        Header:"Delivery Time",
        accessor:"time"
      },
      {
        Header:"Payment Type",
        accessor:"typeOfpayment"
      },
      {
        Header:"Refrance",
        accessor:"refrance"
      },
      {
        Header:"Proof of Payment",
        accessor:"imgUrl"
      },
      {
        Header: "Order Status",
        accessor: "orderStatus"
      },
      {
        Header: "Status",
        Cell: cell => (
          <button className="bg-success rounded" disabled={cell.row.values.orderStatus !== "Processing"}   onClick={()=>handleComplete(cell.row.values.id)}>
            Completed
          </button>
        )
      }
    ], []
  )

  const formattedData = useMemo(() => {
    const flattenDoc = [];
    if(!document) return flattenDoc;

    posts.forEach(doc => {
      const { id, value } = doc;

      flattenDoc.push({
        id, ...value
      })
    })

    return flattenDoc
  }, [posts]);
    return(
        <>
              <Container fluid className="p-0 overflow-scroll">
                <Row className="g-0 mb-5">
                  <HeaderAdmin />
                </Row>
                <Row fluid>
                    <h2 
                    className="text-center fs-4 p-2 mb-3  rounded mt-4"
                        // style={{backgroundColor: "#C2EDCE", 
                        // backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"}}
                        >Custom Cake</h2>
                </Row>
                <ReactTable data={formattedData} 
                        columns={columns} 
                        fetchMorePosts={()=>{fetchMorePosts(lastKey)}} 
                        lastKey={lastKey} 
                        nextPosts_loading={nextPosts_loading}
                        />
                <Row className="g-0 mt-5">
          <Footer />
        </Row>
              </Container>
                
        </>
    )
}

export default AdminCustomCakeOrder;