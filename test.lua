vim.keymap.set('n', '<leader>cm', function()
  local word = vim.fn.expand('<cword>')
  local num = tonumber(word)
  if not num then
    vim.notify('Word under cursor is not a number: ' .. word, vim.log.levels.ERROR)
    return
  end
  vim.ui.input({ prompt = num .. ' - ' }, function(input)
    if not input then return end
    local operand = tonumber(input)
    if not operand then
      vim.notify('Input is not a number: ' .. input, vim.log.levels.ERROR)
      return
    end
    local result = tostring(num - operand)
    -- Replace word under cursor with result
    vim.cmd('normal! ciw' .. result)
  end)
end, { desc = 'Calculate: number under cursor minus input' })
