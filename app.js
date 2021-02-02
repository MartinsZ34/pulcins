$(document).ready(function(){
    let results = $('.results')
    load_results()
    function load_results(last_id = 0)
    {
        let html_data = ''
        $.ajax({
            url: 'server.php',
            method: 'post',
            dataType: 'json',
            data: {action: 'load_results'},
            success: function(data){
                html_data += `
                    <h3>Skolēni</h3>
                    <table><tr>
                        <th>ID</th>
                        <th>Vārds</th>
                        <th>Kurss</th>
                        <th>Bilde</th>
                    </tr>
                    `;
                for(let i = 0; i < data.length; i++)
                {
                    html_data += `
                        <tr data-id='${data[i].id}' ${(() => {
                            if (last_id == data[i].id) {
                              return `class='last_id'`
                            } else {
                              return ``
                            }
                          })()}>
                            <td>${data[i].id}</td>
                            <td><div contenteditable='true' class='editable name'>${data[i].name}</div></td>
                            <td><div contenteditable='true' class='editable class_id'>${data[i].class_id}</div></td>
                            <td>${data[i].avatar}</td>
                        </tr>
                    `;//<td><div contenteditable='true'>${data[i].user_id}</div></td>
                }
            
                html_data += `</table>`;
                results.html(html_data)
            }
        });
    }//beidzas funkcija load_results()

    $(document).on('click', '.editable', function(){
        //Vajag removeClass('last_id') , ja tāda ir?
        $(this).closest('tr').addClass("active");
    })

    $(document).on('focusout', '.editable', function() {
        //Staigājam līdzīgi kā pa mapēm. uzkliko uz td, bet ejam līmeni atpakaļ uz tr
        var tbl_row = $(this).closest('tr');
        let student_id = tbl_row.data('id')
        $(this).closest('tr').removeClass("active");
        $(this).closest('tr').addClass("last_id");
        
        let name = tbl_row.find('.name').text()//tr ir zināms, paņemam jebkuru iekšā esošu td pēc klases
        let class_id = tbl_row.find('.class_id').text()
        
        $.ajax({
            url: 'server.php',
            method: 'post',
            dataType: 'json',
            data: {
                action: 'update_row',
                student_id: student_id,
                name: name,
                class_id: class_id
            },
            success: function(data){
                load_results(data.last_id)
            }
        })
    }) 
})