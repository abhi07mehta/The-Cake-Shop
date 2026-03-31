import { collection, doc, getDocs, limit, orderBy, query, startAfter, updateDoc } from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import { db } from "../firebase";
import { ReactTable } from "../components/t";
import { Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";

const AdminDisplayOrder = () =>{
    const [posts, setPosts] = useState([]);
    const [lastKey, setLastKey] = useState("");
    const [nextPosts_loading, setNextPostsLoading] = useState(false);


    const postsFirstBatch = async () => {
      try {
          const data = await getDocs(query(collection(db, "orderRv") , orderBy("email", "desc"), limit(5)));
          // console.log(data);
        let posts = [];
        let lastKey = "";
        data.docs.map((doc) =>  posts.push({ id: doc.id, value: doc.data() }))
        data.docs.map((doc)=> lastKey = doc.data().email)

      //   lastKey = docs.data().createdAt;;
        // console.log(posts);
        return { posts, lastKey };
      } catch (e) {
        alert("Error",e);
      }
    }

    const postsNextBatch = async (key) => {
      try {
        const data = await getDocs(query(collection(db, "orderRv")  , orderBy("email", "desc"), limit(5), startAfter(key)))

          // console.log(data);
  
        let posts = [];
        let lastKey = "";
        data.docs.map((doc) => posts.push({ id: doc.id, value: doc.data() }))
        data.docs.map((doc)=> lastKey = doc.data().email)
      //   lastKey = data.docs[data.docs.length-1];
        return { posts, lastKey };
      } catch (e) {
        alert("Error",e);
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
      alert("Error",err);
    });
}, []);

// console.log("this is last",lastKey.length);



const handleStatusChange = async (id, newStatus) => {
  // Confirmation for destructive actions
  if (newStatus === "Cancelled") {
    if (!window.confirm(`Are you sure you want to CANCEL order ${id}? This cannot be undone.`)) return;
  }
  try {
    const q = doc(db, "orderRv", `${id}`);
    await updateDoc(q, {
      orderStatus: newStatus,
      lastModified: new Date().toISOString(),
    });
    alert(`Order ${id} status updated to "${newStatus}"`);
    // Refresh the data
    postsFirstBatch()
      .then((res) => {
        setPosts(res.posts);
        setLastKey(res.lastKey);
      })
      .catch((err) => console.log(err));
  } catch (e) {
    alert("Error updating status");
    console.log(e);
  }
};

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
        console.log(err);
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
        Header: "Flavor",
        accessor: "flavor"
      },
      {
        Header: "Price",
        accessor: "price"
      },
      {
        Header: "Title",
        accessor: "title"
      },
      {
        Header:"Address",
        accessor:"address"
      },
      {
        Header:"Payment Type",
        accessor:"typeOfpayment"
      },
      {
        Header:"Reference",
        accessor:"refrance"
      },
      {
        Header:"Proof of payment",
        accessor:"imgUrl"
      },
      {
        Header:"Order Status",
        accessor:"orderStatus"
      },
      {
        Header: "Update Status",
        Cell: cell => (
          <select
            value={cell.row.values.orderStatus}
            onChange={(e) => handleStatusChange(cell.row.values.id, e.target.value)}
            style={{
              padding: '4px 8px',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            <option value="Processing">Processing</option>
            <option value="Baking">Baking</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
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
                <Row className="g-0">
                    <h2 className="text-center fs-4 shadow-lg p-2 mb-3 bg-body rounded mt-4"
                        style={{backgroundColor: "#C2EDCE", 
                        backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"}}>More Order</h2>
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

export default AdminDisplayOrder;