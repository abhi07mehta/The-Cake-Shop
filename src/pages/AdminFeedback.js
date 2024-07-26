import React, { useEffect, useMemo, useState } from "react";
import { db } from "../firebase";
import  "firebase/firestore";
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { ReactTable } from "../components/t";
import HeaderAdmin from '../components/HeaderAdmin'
import { Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";

const AdminFeedback = () =>{
    const [posts, setPosts] = useState([]);
    const [lastKey, setLastKey] = useState("");
    const [nextPosts_loading, setNextPostsLoading] = useState(false);


    const postsFirstBatch = async () => {
        try {
            const data = await getDocs(query(collection(db, "feedback") , orderBy("email", "desc"), limit(5)));
            // console.log(data);
          let posts = [];
          let lastKey = "";
          data.docs.map((doc) =>  posts.push({ id: doc.id, value: doc.data() }))
          data.docs.map((doc)=> lastKey = doc.data().email)

        //   lastKey = docs.data().createdAt;;
          // console.log(posts);
          return { posts, lastKey };
        } catch (e) {
          console.log(e);
        }
      }

      const postsNextBatch = async (key) => {
        try {
          const data = await getDocs(query(collection(db, "feedback")  , orderBy("email", "desc"), limit(5), startAfter(key)))

            // console.log(data);
    
          let posts = [];
          let lastKey = "";
          data.docs.map((doc) => posts.push({ id: doc.id, value: doc.data() }))
          data.docs.map((doc)=> lastKey = doc.data().email)
        //   lastKey = data.docs[data.docs.length-1];
          return { posts, lastKey };
        } catch (e) {
          console.log(e);
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
        console.log(err);
      });
  }, []);

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
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Recommended",
        accessor: "exp"
      },
      {
        Header: "Feedback",
        accessor: "feedback"
      },
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
            <Container fluid className="p-0 overflow-hidden">
                <Row className="g-0 mb-5">
                  <HeaderAdmin />
                </Row>
                <Row className="g-0">
                    <h2 className="text-center fs-4 shadow-lg p-2 mb-3 bg-body rounded mt-4"
                        style={{backgroundColor: "#C2EDCE", 
                        backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"}}>Customer Feedback</h2>
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

export default AdminFeedback;