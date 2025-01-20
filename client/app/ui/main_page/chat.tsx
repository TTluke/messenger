// templ ContactMesage(text string) {
// }
//
// templ UserMesage(text string) {
// <div class="flex w-full h-fit flex-none justify-end my-1">
//   <div class="w-fit max-w-[80%] h-fit bg-[#3476AD] rounded-2xl px-2 py-1">
//     <p class="text-lg text-gray-50 break-words whitespace-pre-wrap overflow-wrap-anywhere">
//       { text }
//     </p>
//   </div>
// </div>
// }

export function Chat() {
  return (
    <div id="chat"
      className="flex h-full w-full flex-grow flex-col-reverse overflow-auto rounded-lg bg-[#332F4B] p-2 outline outline-2 outline-[#443F64]">
    </div>
  )
}
