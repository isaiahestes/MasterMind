

class ApiService {
  static url = 'https://667dd895297972455f667f3a.mockapi.io/api/hero/questions';

  static getAllQuestions() {
    return fetch(this.url).then(response => response.json());
  }

  static createQuestion(question) {
    // console.log('in API service createQuestion ran, ' , question)
    return fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
    }).then(response => response.json())
      .catch(error => {
        console.error('Error creating question:', error);
      });
  }

  static updateQuestion(id, question) {
    // console.log('in API service updateQuestion, ' , question , id)
    return fetch(`${this.url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
    }).then(response => response.json())
      .catch(error => {
        console.error('Error updating question:', error);
      });
  }
  static deleteQuestion(id) {
    return fetch(`${this.url}/${id}`, {
      method: 'DELETE',
    }).then(response => response.json())
      .catch(error => {
        console.error('Error deleting question:', error);
      });
  }
}

export default ApiService;