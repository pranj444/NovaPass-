// Modal Elements //

const modalOverlay =
document.getElementById(
    "modalOverlay"
)

const modalTitle =
document.getElementById(
    "modalTitle"
)

const modalMessage =
document.getElementById(
    "modalMessage"
)

const modalOkButton =
document.getElementById(
    "modalOkButton"
)

const editForm =
document.getElementById(
    "editForm"
)

// Close Modal //

function closeModal(){

    modalOverlay.classList.remove(
        "show"
    )
}

// Show Modal //

function showModal(
    title,
    message,
    okFunction = null
){

    modalTitle.innerText = title

    modalMessage.innerText = message

    editForm.style.display = "none"

    modalOverlay.classList.add(
        "show"
    )

    modalOkButton.onclick = () => {

        if(okFunction){
            okFunction()
        }

        closeModal()
    }
}

// Section Change

function showSection(
    section,
    button
){

    // Remove Active Section 

    document
    .querySelectorAll(".menu-btn")
    .forEach(btn => {

        btn.classList.remove(
            "active"
        )
    })

    // Add New Active Section

    button.classList.add(
        "active"
    )

    // Hide all Section

    document
    .querySelectorAll(".section")
    .forEach(sec => {

        sec.classList.remove(
            "active-section"
        )
    })

    // Show targeted section

    document
    .getElementById(
        section + "Section"
    )
    .classList.add(
        "active-section"
    )
}

// TOggle Add Password

function toggleAddPassword(){

    const input =
    document.getElementById(
        "vault_password"
    )

    if(input.type === "password"){

        input.type = "text"
    }
    else{

        input.type = "password"
    }
}

// Toggle Password

function togglePassword(id){

    const field =
    document.getElementById(
        "pass" + id
    )

    if(!field){
        return
    }

    if(field.type === "password"){

        field.type = "text"
    }
    else{

        field.type = "password"
    }
}

// Copy Password Function ( Vault )

function copyPassword(id){

    const field =
    document.getElementById(
        "pass" + id
    )

    if(!field){
        return
    }

    navigator.clipboard.writeText(
        field.value
    )

    showModal(
        "Copied",
        "Password copied successfully"
    )
}

// Toggle Favourite Password / Starred Passwords

function toggleFavoritePassword(id){

    const field =
    document.getElementById(
        "favoritePass" + id
    )

    if(!field){
        return
    }

    if(field.type === "password"){

        field.type = "text"
    }
    else{

        field.type = "password"
    }
}

// Copy Password Function ( Favourite )

function copyFavoritePassword(id){

    const field =
    document.getElementById(
        "favoritePass" + id
    )

    if(!field){
        return
    }

    navigator.clipboard.writeText(
        field.value
    )

    showModal(
        "Copied",
        "Password copied successfully"
    )
}

// Toggle Favourite ( Vault )

async function toggleFavorite(id){

    const response =
    await fetch("/favorite/" + id)

    const data =
    await response.json()

    if(data.success){

        location.reload()
    }
}

// Add Password 

async function addPassword(){

    const website =
    document.getElementById(
        "website"
    ).value

    const category =
    document.getElementById(
        "category"
    ).value

    const username =
    document.getElementById(
        "vault_username"
    ).value

    const password =
    document.getElementById(
        "vault_password"
    ).value

    if(
        !website ||
        !category ||
        !username ||
        !password
    ){

        showModal(
            "Error",
            "Fill all fields"
        )

        return
    }

    const response =
    await fetch("/add_password",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            website,
            category,
            username,
            password
        })
    })

    const data =
    await response.json()

    if(data.success){

        location.reload()
    }
}

// Delete Password //

async function deletePassword(id){

    showModal(
        "Delete Password",
        "Are you sure you want to delete this password?",
        async () => {

            const response =
            await fetch("/delete/" + id)

            const data =
            await response.json()

            if(data.success){

                location.reload()
            }
        }
    )
}

// Edit Password

function editPassword(id){

    modalTitle.innerText =
    "Edit Password"

    modalMessage.innerText =
    ""

    editForm.style.display =
    "flex"

    modalOverlay.classList.add(
        "show"
    )

    modalOkButton.onclick =
    async () => {

        const website =
        document.getElementById(
            "editWebsite"
        ).value

        const category =
        document.getElementById(
            "editCategory"
        ).value

        const username =
        document.getElementById(
            "editUsername"
        ).value

        const password =
        document.getElementById(
            "editPassword"
        ).value

        const response =
        await fetch("/edit/" + id,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                website,
                category,
                username,
                password
            })
        })

        const data =
        await response.json()

        if(data.success){

            location.reload()
        }
    }
}

// Search Password

function searchPasswords(){

    const input =
    document.getElementById(
        "search"
    ).value.toLowerCase()

    const cards =
    document.querySelectorAll(
        ".password-card"
    )

    cards.forEach(card => {

        const text =
        card.innerText.toLowerCase()

        if(text.includes(input)){

            card.style.display = "flex"
        }
        else{

            card.style.display = "none"
        }
    })
}

// Logout

function logout(){

    window.location.href = "/"
}