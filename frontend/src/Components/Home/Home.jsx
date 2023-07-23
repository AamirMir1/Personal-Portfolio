import React, { useEffect, useState } from 'react'
import "./Home.css"
import { Typewriter } from 'react-simple-typewriter'

import { useDispatch, useSelector } from 'react-redux'
import { deleteProject, getUserDetails, sendContact } from '../../Actions/userActions'
import { useAlert } from 'react-alert'
import { IconButton } from '@mui/material'
import { DeleteForever } from '@mui/icons-material'
import { deleteSkill } from '../../Actions/userActions'

const Home = () => {
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector((state) => state.loadUser)
    const alert = useAlert()
    const { message: skillDeleteMessage, error: skillDeleteError, loading: skillDeleteLoading } = useSelector((state) => state.deleteSkill)
    const [contactDetails, setContactDetails] = useState({
        userName: "",
        userEmail: "",
        userMessage: ""
    })
    const { loading, message, error } = useSelector((state) => state.sendContact)
    const { data } = useSelector((state) => state.getUserData)
    const { loading: deleteProjectLoading, message: deleteProjectMessage, error: deleteProjectError } = useSelector((state) => state.deleteProject)

    useEffect(() => {
        if (message) {
            alert.success(message)
            dispatch({ type: "clearMessages" })

            setContactDetails({
                userName: "",
                userEmail: "",
                userMessage: ""
            })
        }

        if (skillDeleteMessage) {
            alert.success(skillDeleteMessage)
            dispatch({ type: "clearMessages" })
            dispatch(getUserDetails())
        }
        if (skillDeleteError) {
            alert.error(skillDeleteError)
            dispatch({ type: "clearErrors" })
        }
        if (deleteProjectMessage) {
            alert.success(deleteProjectMessage)
            dispatch({ type: "clearMessages" })
            dispatch((getUserDetails()))
        }
        if (deleteProjectError) {
            alert.error(deleteProjectError)
            dispatch({ type: "clearErrors" })
        }
        if (error) {
            alert.error(error)
            dispatch({ type: "clearErrors" })
        }

    }, [message, error, alert, dispatch, skillDeleteMessage, skillDeleteError, deleteProjectError, deleteProjectMessage])


    const handleContactDetails = (e) => {
        setContactDetails((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    const { userName, userEmail, userMessage } = contactDetails
    const handleContact = (e) => {
        e.preventDefault()
        dispatch(sendContact({ userName, userEmail, userMessage }))
    }

    const deleteSkills = (id) => {
        dispatch(deleteSkill(id))
    }
    const deleteProjects = (id) => {
        dispatch(deleteProject(id))
    }
    return <> <div className="Homes">
        <div className="about">
            <h3>
                <Typewriter words={[`Hey, I am ${data?.about && data.about.name}`]} />
            </h3>
            <h1 className='title'>
                I Am A Self Taught <br /> {data?.about && data.about.title}
            </h1>
            <a href='#contact'>
                Contact Me
            </a>
        </div>
        <div className="image">
            <img className='avatar-image' src={data?.about && data.about.avatar.url} alt='My Image' />
        </div>
    </div>
        <div id='skills' className="skills">
            <h1 className="skills-title">Skills</h1>
            <div className="skills-set">
                {
                    data && data?.skills && data.skills.length ? data.skills.map((skill) => {
                        return <div key={skill._id} style={{ position: "relative" }} className="skills-card">
                            <figure>
                                <img src={skill.image.url} alt="Skill" />
                            </figure>
                            <h3>{skill.name}</h3>
                            {
                                isAuthenticated && <IconButton disabled={skillDeleteLoading ? true : false} onDoubleClick={() => deleteSkills(`${skill._id}`)} style={{ position: "absolute", top: "0", left: "0" }}>
                                    <DeleteForever />
                                </IconButton>
                            }
                        </div>
                    }) : null
                }




            </div>
        </div>
        <div className="projects" id='projects'>
            <h1 style={{ color: "white" }}>Projects</h1>
            <div className="projects-set">
                {
                    data && data?.projects && data.projects.length > 0 ? data.projects.map((project) => {
                        return <div key={project._id} style={{ position: "relative" }} className="project-card">
                            <figure>
                                <img src={project.thumbnail.url} alt="Project Img" />
                            </figure>
                            <div className="project-details">
                                <h2 className="project-title d-margin">
                                    {project.title}
                                </h2>
                                <p className="project-description d-margin">
                                    {project.description}
                                </p>
                                <p className="project-description d-margin">
                                    <strong>Key Features:</strong> {project.keyFeatures}
                                </p>
                                <div className="project-technologies d-margin">

                                    <ul>
                                        <li style={{ listStyle: "none", margin: "0rem 1rem 0rem 0rem" }}><strong>Technologies:</strong></li>
                                        {
                                            project.techStack.split(" ").map((stack) => {
                                                return <li key={stack}>{stack}</li>
                                            })
                                        }

                                    </ul>
                                </div>
                                <div className="project-links">
                                    <a style={{ textDecoration: "none" }} target='_blank' href={project.demoUrl}>Live Demo</a>
                                    {
                                        project.github && project.github.length > 0 ? <a style={{ textDecoration: "none" }} target='_blank' href={project.github}>Github Link</a> : null
                                    }

                                </div>
                                {isAuthenticated && <IconButton disabled={deleteProjectLoading ? true : false} onDoubleClick={() => deleteProjects(project._id)}>
                                    <DeleteForever />
                                </IconButton>}
                            </div>
                        </div>
                    }) : null
                }

            </div>
        </div>
        <div id='contact' className="contact">
            <h1>Contact Me</h1>
            <div className="contact-content">
                <form action="" onSubmit={handleContact}>
                    <div className="email-name">
                        <input name='userName' value={contactDetails.userName} type="text" onChange={handleContactDetails} required placeholder='Enter Your Name' />
                        <input value={contactDetails.userEmail} name='userEmail' type="email" onChange={handleContactDetails} required placeholder='Enter Your Email' />
                    </div>

                    <textarea value={contactDetails.userMessage} name='userMessage' rows={7} onChange={handleContactDetails} placeholder='Message...'>

                    </textarea>
                    <input disabled={loading ? true : false} style={{ backgroundColor: loading && "gray", cursor: loading && "default" }} type="submit" value="Send" />
                </form>
            </div>
        </div>

    </>
}
export default Home;