import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    enrollCourse,
    favoriteCourse
} from "../../services/courseService";

import {
    FaHeart,
    FaRegHeart,
    FaStar
} from "react-icons/fa";

import "./Course.css";

function Course({ course }) {

    const navigate = useNavigate();

    const [favorite, setFavorite] = useState(
        course.favorite
    );

    const [enrolled, setEnrolled] = useState(
        course.enrolled
    );

    const handleFavorite = async (e) => {

        e.stopPropagation();

        try {

            await favoriteCourse(course.id);

            setFavorite(!favorite);

        } catch (error) {

            console.error(error);

        }

    };

    const handleEnroll = async (e) => {

        e.stopPropagation();

        try {

            await enrollCourse(course.id);

            setEnrolled(true);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div
            className="course-card"
            onClick={() => navigate(`/courses/${course.id}`)}
        >

            <div className="course-image">

                {
                    course.imageUrl
                        ? (
                            <img
                                src={course.imageUrl}
                                alt={course.title}
                            />
                        )
                        : (
                            <div className="default-image">
                                📘
                            </div>
                        )
                }

            </div>

            <div className="course-body">

                <h3>
                    {course.title}
                </h3>

                <p className="course-instructor">

                    {course.instructor}

                </p>

                <div className="course-info">
                                        <span className="difficulty">

                        {course.difficulty}

                    </span>

                    <span className="rating">

                        <FaStar />

                        {course.rating ?? 0}

                    </span>

                </div>

                <div className="course-footer">

                    <button
                        className="enroll-btn"
                        onClick={handleEnroll}
                    >

                        {
                            enrolled
                                ? "Enrolled"
                                : "Enroll Now"
                        }

                    </button>

                    <button
                        className="favorite-btn"
                        onClick={handleFavorite}
                    >

                        {
                            favorite
                                ? (
                                    <FaHeart
                                        color="red"
                                    />
                                )
                                : (
                                    <FaRegHeart
                                        color="white"
                                    />
                                )
                        }

                    </button>

                </div>

            </div>
                    </div>

    );

}

export default Course;