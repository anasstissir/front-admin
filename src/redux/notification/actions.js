import * as Communication from '../actions'

const API_METHOD = { POST: 'POST', GET: 'GET', PUT: 'PUT', DELETE: 'DELETE' }



export const getSectionList = (params) => {
  return {
    type: Communication.GET_SECTIONS,
    meta: {
      API_CALL: 'faq-sections',
      API_PAYLOAD: { params },
      API_SUCCESS: Communication.GET_SECTIONS_SUCCESS,
      API_ERRORS: Communication.GET_SECTIONS_ERROR
    }
  }
}

export const getSectionById = (id) => {
  return {
    type: Communication.GET_SECTION,
    meta: {
      API_CALL: 'faq-sections/'+id,
      API_SUCCESS: Communication.GET_SECTION_SUCCESS,
      API_ERRORS: Communication.GET_SECTION_ERROR
    }
  }
}

export const addSection = (category) => {
  return (
    {
      type: Communication.ADD_SECTION,
      meta: {
        API_METHOD: API_METHOD.POST,
        API_CALL: 'faq-sections',
        API_PAYLOAD: category,
        API_SUCCESS: Communication.ADD_SECTION_SUCCESS,
        API_ERRORS: Communication.ADD_SECTION_ERROR
      }
    }
  )
}

export const editSection= (cat) => {
  return (
    {
      type: Communication.EDIT_SECTION,
      meta: {
        API_METHOD: API_METHOD.PUT,
        API_CALL: 'faq-sections',
        API_PAYLOAD: cat,
        API_SUCCESS: Communication.EDIT_SECTION_SUCCESS,
        API_ERRORS: Communication.EDIT_SECTION_ERROR
      }
    }
  )
}

export const deleteSection = (category_id) => {
  return (
    {
      type: Communication.DELETE_SECTION,
      meta: {
        API_METHOD: API_METHOD.DELETE,
        API_CALL: 'faq-sections/' + category_id,
        API_SUCCESS: Communication.DELETE_SECTION_SUCCESS,
        API_ERRORS: Communication.DELETE_SECTION_ERROR
      }
    }
  )
}


export const getSubSectionList = (params) => {
  return {
    type: Communication.GET_SUB_SECTIONS,
    meta: {
      API_CALL: 'faq-subsections',
      API_PAYLOAD: { params },
      API_SUCCESS: Communication.GET_SUB_SECTIONS_SUCCESS,
      API_ERRORS: Communication.GET_SUB_SECTIONS_ERROR
    }
  }
}

export const getSubSectionById = (id) => {
  return {
    type: Communication.GET_SUB_SECTION,
    meta: {
      API_CALL: 'faq-sections/'+id,
      API_SUCCESS: Communication.GET_SUB_SECTION_SUCCESS,
      API_ERRORS: Communication.GET_SUB_SECTION_ERROR
    }
  }
}

export const addSubSection = (section) => {
  return (
    {
      type: Communication.ADD_SUB_SECTION,
      meta: {
        API_METHOD: API_METHOD.POST,
        API_CALL: 'faq-sections',
        API_PAYLOAD: section,
        API_SUCCESS: Communication.ADD_SUB_SECTION_SUCCESS,
        API_ERRORS: Communication.ADD_SUB_SECTION_ERROR
      }
    }
  )
}

export const editSubSection= (cat) => {
  return (
    {
      type: Communication.EDIT_SUB_SECTION,
      meta: {
        API_METHOD: API_METHOD.PUT,
        API_CALL: 'faq-sections',
        API_PAYLOAD: cat,
        API_SUCCESS: Communication.EDIT_SUB_SECTION_SUCCESS,
        API_ERRORS: Communication.EDIT_SUB_SECTION_ERROR
      }
    }
  )
}

export const deleteSubSection = (category_id) => {
  return (
    {
      type: Communication.DELETE_SUB_SECTION,
      meta: {
        API_METHOD: API_METHOD.DELETE,
        API_CALL: 'faq-sections/' + category_id,
        API_SUCCESS: Communication.DELETE_SUB_SECTION_SUCCESS,
        API_ERRORS: Communication.DELETE_SUB_SECTION_ERROR
      }
    }
  )
}


export const getQuestionList = (params) => {
  return {
    type: Communication.GET_QUESTIONS,
    meta: {
      API_CALL: 'faqs',
      API_PAYLOAD: { params },
      API_SUCCESS: Communication.GET_QUESTIONS_SUCCESS,
      API_ERRORS: Communication.GET_QUESTIONS_ERROR
    }
  }
}

export const getQuestionById = (id) => {
  return {
    type: Communication.GET_QUESTION,
    meta: {
      API_CALL: 'faqs/'+id,
      API_SUCCESS: Communication.GET_QUESTION_SUCCESS,
      API_ERRORS: Communication.GET_QUESTION_ERROR
    }
  }
}

export const addQuestion = (section) => {
  return (
    {
      type: Communication.ADD_QUESTION,
      meta: {
        API_METHOD: API_METHOD.POST,
        API_CALL: 'faqs',
        FORM_DATA: true,
        API_PAYLOAD: section,
        API_SUCCESS: Communication.ADD_QUESTION_SUCCESS,
        API_ERRORS: Communication.ADD_QUESTION_ERROR
      }
    }
  )
}

export const editQueestion= (cat) => {
  return (
    {
      type: Communication.EDIT_QUESTION,
      meta: {
        API_METHOD: API_METHOD.PUT,
        API_CALL: 'faqs',
        FORM_DATA: true,
        API_PAYLOAD: cat,
        API_SUCCESS: Communication.EDIT_QUESTION_SUCCESS,
        API_ERRORS: Communication.EDIT_QUESTION_ERROR
      }
    }
  )
}

export const deleteQuestion = (category_id) => {
  return (
    {
      type: Communication.DELETE_QUESTION,
      meta: {
        API_METHOD: API_METHOD.DELETE,
        API_CALL: 'faqs/' + category_id,
        API_SUCCESS: Communication.DELETE_QUESTION_SUCCESS,
        API_ERRORS: Communication.DELETE_QUESTION_ERROR
      }
    }
  )
}

export const download = (id) => {
  return (
    {
      type: "Communication.DELETE_QUESTION",
      meta: {
        API_METHOD: API_METHOD.GET,
        API_CALL: 'pdfs/'+id+'/view',
        API_SUCCESS: "Communication.DELETE_QUESTION_SUCCESS",
        API_ERRORS: "Communication.DELETE_QUESTION_ERROR"
      }
    }
  )
}