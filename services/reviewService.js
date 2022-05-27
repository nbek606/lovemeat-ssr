import dateService from "./dateService";

const getReviews = (data) => {
    const parser = new DOMParser()
    const document = parser.parseFromString(data.content.rendered, "text/html");
    const headers = document.querySelectorAll('.wpmtst-testimonial-content .testimonial-heading')
    const contents = document.querySelectorAll('.wpmtst-testimonial-content p')
    const names = document.querySelectorAll('.testimonial-name')
    const reviews = []

    for (let i = 0; i < headers.length; i++) {
      reviews[i] = {
        id: i,
        header: headers[i].innerText,
        content: contents[i].innerText,
        name: names[i].innerText,
        created_date: dateService.getStandartDate(data.date)
      }
    }

    return reviews
}

export default {
  getReviews
}