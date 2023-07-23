import axios from 'axios'
axios.defaults.withCredentials = true;

export const addProject = ({ title, techStack, description, demoUrl, github, thumbnail, keyFeatures }) => async (dispatch) => {
    try {
        const userData = {
            title,
            techStack,
            description,
            demoUrl,
            github,
            thumbnail,
            keyFeatures
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        dispatch({ type: "addProjectRequest" })
        const { data } = await axios.post("http://localhost:5000/project/create", userData, config)
        dispatch({ type: "addProjectSuccess", payload: data.message })
    } catch (error) {
        dispatch({ type: "addProjectFailure", payload: error.response.data.message })
    }
}
export const addSkills = ({ name, image }) => async (dispatch) => {
    try {
        const userData = {
            name,
            image
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        dispatch({ type: "addSkillsRequest" })
        const { data } = await axios.post("http://localhost:5000/skill/add", userData, config)
        dispatch({ type: "addSkillsSuccess", payload: data.message })
    } catch (error) {
        dispatch({ type: "addSkillsFailure", payload: error.response.data.message })
    }
}
export const updateProfile = ({ name, email, avatar, title }) => async (dispatch) => {
    try {
        const userData = {
            name,
            email,
            avatar,
            title
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        dispatch({ type: "updateProfileRequest" })
        const { data } = await axios.post("http://localhost:5000/profile/update", userData, config)
        dispatch({ type: "updateProfileSuccess", payload: data.message })
    } catch (error) {
        dispatch({ type: "updateProfileFailure", payload: error.response.data.message })
    }
}

export const updatePassword = ({ oldPassword, newPassword, confirmPassword }) => async (dispatch) => {
    try {
        const userData = {
            oldPassword,
            newPassword,
            confirmPassword
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        dispatch({ type: "updatePasswordRequest" })
        const { data } = await axios.put("http://localhost:5000/password/update", userData, config)
        dispatch({ type: "updatePasswordSuccess", payload: data.message })
    } catch (error) {
        dispatch({ type: "updatePasswordFailure", payload: error.response.data.message })
    }
}
export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: "logoutRequest" })
        const { data } = await axios.post("http://localhost:5000/logout")
        dispatch({ type: "logoutSuccess", payload: data.message })
    } catch (error) {
        dispatch({ type: "logoutFailure", payload: error.response.data.message })
    }
}