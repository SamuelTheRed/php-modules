<!-- Page List Component -->
<!-- ~Samuel Shelley 2024-09-05 -->
<style><?php require "style.css";?></style>
<!-- List -->
<div id="list_container">
    <table>
        <thead>
            <tr id="list_table_title" class="col_headers">
                <th colspan="4">List</th>
            </tr>
            <tr class="col_headers">
                <th>Name</th>
                <th>Attribute</th>
                <th>Visibilty</th>
            </tr>
        </thead>
        <tbody id="list">
        </tbody>
    </table>
</div>
<!-- Add Object Form -->
<div id="add_object_container">
    <table>
        <thead>
            <tr id="add_table_title" class="col_headers">
                <th colspan="4">Add Object</th>
            </tr>
        </thead>
        <tbody id="add_object">
            <tr id="object_add_row">
                <td class="first_col"><input type="text" id="a_name" name="a_name" placeholder="name"></td>
                <td><select name="a_attr" id="a_attr">
                    <option value="Standard">Standard</option>
                    <option value="Privileged">Privileged</option>
                </select></td>
                <td class="last_col">
                    <input type="checkbox" id="a_visbl" name="a_visbl" value="a_visbl">
                    <label for="a_visbl">visible</label><br>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="button_row">
        <button onclick="submitObjectAdd()">Add Object</button>
    </div>
</div>
<!-- Update Object Form -->
<div id="update_object_container">
    <table>
        <thead>
            <tr id="update_table_title" class="col_headers">
                <th colspan="4">Update Object</th>
            </tr>
        </thead>
        <tbody id="update_object">
            <tr id="object_update_row">
                <td class="first_col"><input type="text" id="u_name" name="u_name" placeholder="name"></td>
                <td><select name="u_attr" id="u_attr">
                    <option value="Standard">Standard</option>
                    <option value="Privileged">Privileged</option>
                </select></td>
                <td class="last_col">
                    <input type="checkbox" id="u_visbl" name="u_visbl" value="u_visbl">
                    <label for="u_visbl">visible</label><br>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="button_row">
        <button onclick="submitObjectUpdate()">Update Object</button>
        <button onclick="deleteObject()">Delete Object</button>
    </div>
</div>

<script><?php require "script.js";?></script>
