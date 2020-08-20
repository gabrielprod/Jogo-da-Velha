function hide() {
    const input1 = document.getElementById('input1')
    const input2 = document.getElementById('input2')

    $('#btnmenu').on('click', () => {
        if (input1.value == '' || input2.value == '') {
            alert('Digite o nome dos participantes !')
        } else {
            $('#btnmenu').click(() => {
                $('#menu').slideUp(1000)
            })
        }

    })


}

hide()