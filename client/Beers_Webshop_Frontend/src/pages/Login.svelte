<script>
    import { loggedInStatus } from "../stores/user";
    import { backendURL } from "../stores/general";
    import { useNavigate } from "svelte-navigator";
    const navigate = useNavigate();

    import { toast } from "@zerodevx/svelte-toast";
    let email;
    let password;

    let emailInput;

    const submitLogin = async () => {
        try {
            //checks if mail is valid before sending request
            if (emailInput.checkValidity()) {
                const response = await fetch($backendURL + "auth/login", {
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
                const data = await response.json();
                if (response.ok) {
                    $loggedInStatus = data.isLoggedIn;
                    toast.push("Logged in!", {
                        theme: {
                            "--toastBackground": "#48BB78",
                            "--toastBarBackground": "#2F855A",
                        },
                    });
                    navigate("../")
                    //bad response
                } else {
                    switch (data.msg) {
                        case "noMail":
                        toast.push("Please enter an email", {
                            theme: {
                                "--toastBackground": "#F56565",
                                "--toastBarBackground": "#C53030",
                            },
                        })
                            break;
                        case "badEmail":
                            toast.push("User with email doesn't exist", {
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
                        case "incorrectPassword":
                            toast.push("Incorrect password", {
                                theme: {
                                    "--toastBackground": "#F56565",
                                    "--toastBarBackground": "#C53030",
                                },
                            })
                            break;
                        default:
                            break;
                    }
                }
                //invalid email
            } else {
                emailInput.reportValidity()
            }
            //fetch error
        } catch {
            toast.push("Server error", {
                theme: {
                "--toastBackground": "#F56565",
                "--toastBarBackground": "#C53030",
                },
            })

        
        }
    };
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
        <input type="submit" on:click|preventDefault={submitLogin} />
    </form>
</div>

<style>
    div {
        display: flex;
        justify-content: center;
        /*height: 100vh;*/
    }
</style>
