<script>
    import {toast} from "@zerodevx/svelte-toast"
    import { backendURL } from "../stores/general"
    import { useNavigate } from "svelte-navigator"
    const navigate = useNavigate()

    let emailInput
    let email
    let password
    const signUp = async () => {
        //validates email with html validation
        if (emailInput.checkValidity()) {
            const response = await fetch($backendURL + "auth/signup", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
            if (response.ok) {
                toast.push("Successfully signed up, please log in", {duration: 15000,
                    theme: {
                        '--toastBackground': '#48BB78',
                        '--toastBarBackground': '#2F855A'
                    }
                })
                toast.push("Signed up email sent")
                navigate("../")
            } else {
                const result = await response.json()
                console.log(result)
                switch (result.msg) {
                    case "noEmail":
                        toast.push("Please enter an Email", {
                            theme: {
                                "--toastBackground": "#F56565",
                                "--toastBarBackground": "#C53030",
                            },
                        })
                        break;
                    case "noPassword":
                        toast.push("Please enter a password", {
                            theme: {
                                "--toastBackground": "#F56565",
                                "--toastBarBackground": "#C53030",
                            },
                        })
                        break;
                    case "userExists":
                        toast.push("User with that email already exists", {
                            theme: {
                                "--toastBackground": "#F56565",
                                "--toastBarBackground": "#C53030",
                            },
                        })
                        break;
                    case "invalidPassword":
                        toast.push("Please enter a valid password. Upper and lower case, numbers, symbols and 10 to 16 chars", {
                            theme: {
                                "--toastBackground": "#F56565",
                                "--toastBarBackground": "#C53030",
                            },
                        })
                        break;
                
                    default:
                        toast.push("Server error", {
                            theme: {
                                "--toastBackground": "#F56565",
                                "--toastBarBackground": "#C53030",
                            },
                        })
                        break;
                }
            }
        }
    }

</script>

<div>
    <form autocomplete="off">
        <input
            type="email"
            bind:this={emailInput}
            bind:value={email}
            placeholder="example@mail.com"
            required
        />
        <input
            type="password"
            bind:value={password}
            placeholder="password"
            required
        />
        <input type="submit" on:click|preventDefault={signUp} />
    </form>
</div>

<style>
    div {
        display: flex;
        justify-content: center;
        /*height: 100vh;*/
    }
</style>