// Modal Elements

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

// Close Modal

function closeModal(){

    modalOverlay.classList.remove(
        "show"
    )
}

// Show Modal

function showModal(
    title,
    message
){

    modalTitle.innerText = title

    modalMessage.innerText = message

    modalOverlay.classList.add(
        "show"
    )

    modalOkButton.onclick = () => {

        closeModal()
    }
}

// Login

async function login(){

    const username =
    document.getElementById(
        "username"
    ).value

    const password =
    document.getElementById(
        "password"
    ).value

    const response =
    await fetch("/login",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            username,
            password
        })
    })

    const data =
    await response.json()

    if(data.success){

        window.location.href =
        "/dashboard"
    }
    else{

        showModal(
            "Login Failed",
            "Invalid Username or Password"
        )
    }
}