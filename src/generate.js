function generateHTML(data) {
    var html = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team</title>
    <style>

    </style>
</head>
<body>`
    for (let i = 0; i < data.length; i++) {
        const emp = data[i]
        const name = emp.getName()
        const id = emp.getId()
        const email = emp.getEmail()
        const role = emp.getRole()
        html += `
        <div class = "${role}">
            <h3> ${role} </h3>
                <h2> ${name} </h2>
                <p> id: ${id} </p>
                <p> email: ${email} </p>`
        if(role === 'Manager'){
            html += `<p> office number: ${emp.getOffice()} </p>`
        }
        if(role === 'Intern'){
            html += `<p> University: ${emp.getSchool()} </p>`
        }
        if(role === 'Engineer'){
            html += `<p> Github: ${emp.getGithub()} </p>`
        }
                html += "</div>"
    }
html += `</body>
</html>
    `
    return html
  }
  
  module.exports = generateHTML