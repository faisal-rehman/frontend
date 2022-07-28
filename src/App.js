import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StdList from "./components/students/List";
import StudentDetail from "./components/students/Detail";
import List from "./components/books/List";
import BookDetail from "./components/books/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/books" element={<List />} />
        <Route exact path="/book/detail/:id" element={<BookDetail />} />
        <Route exact path="/" element={<StdList />} />
        <Route exact path="/student/detail/:id" element={<StudentDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
